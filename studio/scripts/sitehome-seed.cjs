const {getCliClient}=require('sanity/cli');
const fs=require('node:fs');
const path=require('node:path');
async function main(){
 const base=getCliClient({apiVersion:'2025-12-31'});
 if(base.config().projectId!=='fzn0qzqj') throw new Error('Wrong project');
 const target=base.withConfig({dataset:'sitehome-test',useCdn:false,perspective:'published'});
 const datasets=await base.datasets.list();
 if(!datasets.some(x=>x.name==='sitehome-test')) await base.datasets.create('sitehome-test',{aclMode:'public'});
 const id='48f6c2d9-1a2e-4a2e-b8de-66751e5a4ab5';
 if(!await target.getDocument(id)){
  const source=base.withConfig({dataset:'production',useCdn:false,perspective:'published'});
  const doc=await source.getDocument(id);
  if(!doc || doc._type!=='portfolio')throw new Error('Source portfolio missing');
  const refs=[];
  function scan(value){if(!value||typeof value!=='object')return;if(value._ref)refs.push(value._ref);Object.values(value).forEach(scan);}
  scan(doc);
  const imageId=doc.mainImage?.asset?._ref;
  if(refs.some(ref=>ref!==imageId))throw new Error('Additional references need explicit test-copy handling');
  if(imageId){
   const asset=await source.getDocument(imageId);
   const url=new URL(asset.url);
   if(url.hostname!=='cdn.sanity.io'||!url.pathname.startsWith('/images/fzn0qzqj/production/'))throw new Error('Unexpected source asset');
   const response=await fetch(url);
   if(!response.ok)throw new Error('Source asset read failed');
   const copy=await target.assets.upload('image',Buffer.from(await response.arrayBuffer()),{filename:asset.originalFilename});
   doc.mainImage.asset._ref=copy._id;
  }
  delete doc._rev;delete doc._createdAt;delete doc._updatedAt;
  await target.createIfNotExists(doc);
 }
 const token=base.config().token;
 if(!token)throw new Error('Login token missing');
 // Temporary local-only session; never log it or expose it to Expo.
 const file='/Users/brian/.sitehome-local/sanity-session.json';
 fs.writeFileSync(file,JSON.stringify({SANITY_PROJECT_ID:'fzn0qzqj',SANITY_DATASET:'sitehome-test',SANITY_TEST_READ_TOKEN:token,SANITY_TEST_WRITE_TOKEN:token}),{mode:0o600});
 fs.chmodSync(file,0o600);
 console.log('sitehome-test ready; one portfolio item and its image copied. Local session stored privately.');
}
main().catch(e=>{console.error('Test provisioning failed', {status:e.statusCode ?? null, type:e.constructor.name});process.exitCode=1});
