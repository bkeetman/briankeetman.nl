import React from 'react';
import type { LayoutProps, NavbarProps, ToolMenuProps } from 'sanity';
import { Box, Card, Flex, Stack, Text } from '@sanity/ui';

const gradient =
  'radial-gradient(circle at 20% 20%, rgba(213, 20, 123, 0.12), transparent 30%), ' +
  'radial-gradient(circle at 80% 10%, rgba(116, 47, 255, 0.12), transparent 28%), ' +
  'radial-gradient(circle at 50% 80%, rgba(18, 168, 168, 0.12), transparent 26%)';

export function BrandLogo() {
  return (
    <Flex align="center" gap={3} padding={3}>
      <Card
        padding={3}
        radius={2}
        shadow={2}
        style={{
          backgroundColor: '#2a2a2a',
          backgroundImage: gradient,
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box
          as="img"
          src="/logo.svg"
          alt="Brian Keetman"
          style={{
            display: 'block',
            width: '44px',
            height: '44px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 18px rgba(213,20,123,0.35))',
          }}
        />
      </Card>
      <Stack space={1}>
        <Text
          size={2}
          weight="semibold"
          style={{
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#fdf2ff',
          }}
        >
          Brian Keetman
        </Text>
        <Text
          size={1}
          style={{
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Studio
        </Text>
      </Stack>
    </Flex>
  );
}

export function BrandNavbar(props: NavbarProps) {
  return (
    <Card
      padding={3}
      shadow={1}
      style={{
        backgroundColor: '#1a1919',
        backgroundImage: gradient,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {props.renderDefault(props)}
    </Card>
  );
}

export function BrandLayout(props: LayoutProps) {
  return (
    <Card
      padding={4}
      radius={0}
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1919',
        backgroundImage: gradient,
      }}
    >
      <Card
        padding={3}
        shadow={1}
        radius={3}
        style={{
          backgroundColor: '#0f0f0f',
          border: '1px solid rgba(255,255,255,0.05)',
          minHeight: 'calc(100vh - 48px)',
        }}
      >
        {props.renderDefault(props)}
      </Card>
    </Card>
  );
}

export function BrandToolMenu(props: ToolMenuProps) {
  return (
    <Card
      padding={3}
      radius={2}
      shadow={1}
      style={{
        backgroundColor: '#131313',
        border: '1px solid rgba(255,255,255,0.06)',
        margin: '0.75rem',
      }}
    >
      {props.renderDefault(props)}
    </Card>
  );
}
