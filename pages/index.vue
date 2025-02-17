<template>
	<div>
		<section class="hero-section">
			<Swiper
				:modules="[SwiperAutoplay, SwiperEffectCreative]"
				:slides-per-view="1"
				:loop="true"
				:pagination="true"
				:effect="'creative'"
				:autoplay="{
					delay: 5000,
					disableOnInteraction: true,
				}"
				:creative-effect="{
					prev: {
						shadow: false,
						translate: ['-20%', 0, -1],
					},
					next: {
						translate: ['100%', 0, 0],
					},
				}"
			>
				<SwiperSlide v-for="(post, index) in postReels" :key="index">
					<PostReel :post="post" />
				</SwiperSlide>
			</Swiper>
		</section>
		<section class="posts-highlight-section flex flex-wrap items-center justify-center gap-10 py-10">
			<CategoryCard v-for="(post, index) in highlightPosts" :key="index" :post="post" align="center" />
		</section>
		<section class="latest-section flex w-full flex-col gap-5 bg-gray-100 px-7 py-10">
			<h2 class="text-center text-2xl font-bold">Latest Posts</h2>
			<p class="text-center text-sm">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, adipisci.
			</p>
			<NuxtLayout name="ad-layout" aside-heading="Trending Posts" :posts="postHighlights">
				<div class="main-content content flex flex-col gap-5 lg:basis-3/5">
					<div
						class="latest-post-container flex h-1/2 min-h-[300px] flex-col items-center justify-center gap-5 rounded-xl bg-gray-900 px-3 text-white"
					>
						<span class="text-xs font-bold lg:text-sm">Review</span>
						<h3 class="text-center text-sm font-bold lg:text-base">
							2023 Monza GP Review: The Temple of Speed Delivered
						</h3>
						<span class="text-center text-xs lg:text-sm">KamCy Ahaka . Sept 1, 2023 . 10 min read</span>
					</div>
					<div class="other-latest-posts flex flex-col gap-5">
						<PostHighlight v-for="(post, index) in latestPosts" :key="index" :post="post" size="lg" />
					</div>
				</div>
			</NuxtLayout>
		</section>
		<section class="newest-section mx-auto flex max-w-5xl flex-col items-start gap-5 px-4 py-5">
			<h2 class="relative flex gap-2 text-xl font-bold">
				Newest from
				<button
					class="categories-toggle flex items-center gap-3"
					@click="showNewestCategoriesDropdown = !showNewestCategoriesDropdown"
				>
					<span class="underline">
						{{ currentNewestOption }}
					</span>
					<client-only>
						<font-awesome-icon class="text-sm" :icon="['fas', 'chevron-down']" />
					</client-only>
				</button>
				<CategoryDropdown v-if="showNewestCategoriesDropdown" :categories="postCategories" />
			</h2>
			<div
				class="newest-post-container mx-auto grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:px-5 lg:grid-cols-4"
			>
				<CategoryCard v-for="(post, index) in newestPosts" :key="index" :post="post" />
			</div>
		</section>
		<NewsletterSubscription />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type PostReel from "~/types/PostReel";
import type PostHighlight from "~/types/PostHighlight";

const currentNewestOption = ref("Race report");

const showNewestCategoriesDropdown = ref(false);

const postReels: PostReel[] = [
	{
		tag: "News",
		title: "Hamilton and Russell extend Mercedes contract",
		text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum assumenda omnis libero placeat aperiam fugit tempore hic id accusantium impedit.",
	},
	{
		tag: "Review",
		title: "2023 Monza GP Review: The Temple of Speed Delivered",
		text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum assumenda omnis libero placeat aperiam fugit tempore hic id accusantium impedit.",
	},
];

const postHighlights: PostHighlight[] = [
	{
		author: "John Doe",
		imgUrl: "https://example.com/image1.jpg",
		title: "Lewis Hamilton Wins Monaco Grand Prix",
		date: "2023-05-15",
		length: 78,
		tag: "Race Report",
		text: "In a stunning display of skill, Hamilton secured victory in Monaco, solidifying his dominance this season.",
	},
	{
		author: "Sarah Smith",
		imgUrl: "https://example.com/image2.jpg",
		title: "Red Bull Racing's New Aerodynamic Innovation",
		date: "2023-06-02",
		length: 65,
		tag: "Technical Update",
		text: "Red Bull Racing unveils a groundbreaking aero concept, promising a significant performance boost.",
	},
	{
		author: "Emma White",
		imgUrl: "https://example.com/image4.jpg",
		title: "Mercedes and Red Bull Locked in Intense Rivalry",
		date: "2023-04-10",
		length: 84,
		tag: "Rivalry Watch",
		text: "The battle between Mercedes and Red Bull continues to heat up, creating an electrifying season for F1 fans.",
	},
	{
		author: "David Clark",
		imgUrl: "https://example.com/image5.jpg",
		title: "2023 F1 Calendar Released",
		date: "2023-02-15",
		tag: "Calendar Update",
		text: "The official F1 calendar for 2023 is out, featuring new additions and some fan-favorite tracks.",
	},
	{
		author: "Michael Brown",
		imgUrl: "https://example.com/image3.jpg",
		title: "Ferrari's Young Talent Shines in Barcelona Test",
		date: "2023-03-28",
		length: 92,
		tag: "Testing Analysis",
		text: "Ferrari's rookie driver impresses with consistent lap times during the preseason testing at Circuit de Barcelona-Catalunya.",
	},
];

const latestPosts: PostHighlight[] = [
	{
		author: "John Doe",
		imgUrl: "https://example.com/image1.jpg",
		title: "Lewis Hamilton Wins Monaco Grand Prix",
		date: "2023-05-15",
		length: 78,
		tag: "Race Report",
		text: "In a stunning display of skill, Hamilton secured victory in Monaco, solidifying his dominance this season.",
	},
	{
		author: "Sarah Smith",
		imgUrl: "https://example.com/image2.jpg",
		title: "Red Bull Racing's New Aerodynamic Innovation",
		date: "2023-06-02",
		length: 65,
		tag: "Technical Update",
		text: "Red Bull Racing unveils a groundbreaking aero concept, promising a significant performance boost.",
	},
];

const newestPosts: PostHighlight[] = [
	{
		author: "John Doe",
		imgUrl: "https://example.com/image1.jpg",
		title: "Lewis Hamilton Wins Monaco Grand Prix",
		date: "2023-05-15",
		length: 78,
		tag: "Race Report",
		text: "In a stunning display of skill, Hamilton secured victory in Monaco, solidifying his dominance this season.",
	},
	{
		author: "Sarah Smith",
		imgUrl: "https://example.com/image2.jpg",
		title: "Red Bull Racing's New Aerodynamic Innovation",
		date: "2023-06-02",
		length: 65,
		tag: "Technical Update",
		text: "Red Bull Racing unveils a groundbreaking aero concept, promising a significant performance boost.",
	},
	{
		author: "Emma White",
		imgUrl: "https://example.com/image4.jpg",
		title: "Mercedes and Red Bull Locked in Intense Rivalry",
		date: "2023-04-10",
		length: 84,
		tag: "Rivalry Watch",
		text: "The battle between Mercedes and Red Bull continues to heat up, creating an electrifying season for F1 fans.",
	},
	{
		author: "David Clark",
		imgUrl: "https://example.com/image5.jpg",
		title: "2023 F1 Calendar Released",
		date: "2023-02-15",
		tag: "Calendar Update",
		text: "The official F1 calendar for 2023 is out, featuring new additions and some fan-favorite tracks.",
	},
];

const highlightPosts: PostHighlight[] = [
	{
		author: "John Doe",
		imgUrl: "https://example.com/image1.jpg",
		title: "Lewis Hamilton Wins Monaco Grand Prix",
		date: "2023-05-15",
		length: 78,
		tag: "Race Report",
		text: "In a stunning display of skill, Hamilton secured victory in Monaco, solidifying his dominance this season.",
	},
	{
		author: "Sarah Smith",
		imgUrl: "https://example.com/image2.jpg",
		title: "Red Bull Racing's New Aerodynamic Innovation",
		date: "2023-06-02",
		length: 65,
		tag: "Technical Update",
		text: "Red Bull Racing unveils a groundbreaking aero concept, promising a significant performance boost.",
	},
	{
		author: "Emma White",
		imgUrl: "https://example.com/image4.jpg",
		title: "Mercedes and Red Bull Locked in Intense Rivalry",
		date: "2023-04-10",
		length: 84,
		tag: "Rivalry Watch",
		text: "The battle between Mercedes and Red Bull continues to heat up, creating an electrifying season for F1 fans.",
	},
];

const postCategories = ["Race Report", "News", "Predictions"];
</script>

<style lang="scss" scoped></style>
