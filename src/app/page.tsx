"use client";

import React from 'react';

import { Heading, Text, Flex, Button, Grid, Icon, InlineCode, Logo, LetterFx, Arrow, RevealFx } from '@/once-ui/components';
import Link from 'next/link';

import { MenuList } from '@/components/menuList';

export default function Home() {
	const links = [
		{
			href: "https://once-ui.com/docs/theming",
			title: "Themes",
			description: "Style your app in minutes.",
		},
		{
			href: "https://once-ui.com/docs/flexComponent",
			title: "Layout",
			description: "Build responsive layouts.",
		},
		{
			href: "https://once-ui.com/docs/typography",
			title: "Typography",
			description: "Scale text automatically.",
		},
	];

	return (
		<>
		<Flex
			fillWidth paddingBottom="xl" paddingX="l"
			direction="column" alignItems="center" flex={1}>
			<Flex
				position="relative"
				as="section" overflow="hidden"
				fillWidth minHeight="0" maxWidth={68}
				direction="column" alignItems="center" justifyContent="center" flex={1}>
				<RevealFx
					speed="medium"
					delay={0}
					translateY={4}
				>
				<Flex
					as="main"
					direction="column" alignItems="center" justifyContent="center"
					fillWidth fillHeight>
						<Heading
							wrap="balance"
							variant="display-strong-m">
								{/* <LetterFx
									trigger="instant"> */}
									My Site is Developing ...
								{/* </LetterFx> */}
						</Heading>
						<Text paddingTop='l'>I'm trying my best to make this site better.</Text>
						<Text>I will be back soon.</Text>
					</Flex>
				</RevealFx>
			</Flex>
		
		</Flex>
		<Flex fillWidth direction="row"	alignItems="center" justifyContent="center" paddingBottom="l">
			<MenuList />
		</Flex>
		</>
	);
}
