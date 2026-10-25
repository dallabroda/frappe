<template>
rticles...'"#:placeholder="__('Search articles...')"#
	<div class="flex flex-col gap-2 overflow-hidden">
rticles...'"#:placeholder="__('Search articles...')"#
		<div class="m-1">
rticles...'"#:placeholder="__('Search articles...')"#
			<TextInput
rticles...'"#:placeholder="__('Search articles...')"#
				ref="searchInput"
rticles...'"#:placeholder="__('Search articles...')"#
				:placeholder="__('Search articles...')"
rticles...'"#:placeholder="__('Search articles...')"#
				v-model="search"
rticles...'"#:placeholder="__('Search articles...')"#
				:debounce="300"
rticles...'"#:placeholder="__('Search articles...')"#
			>
rticles...'"#:placeholder="__('Search articles...')"#
				<template #prefix>
rticles...'"#:placeholder="__('Search articles...')"#
					<LucideSearch class="size-4 text-ink-gray-5" />
rticles...'"#:placeholder="__('Search articles...')"#
				</template>
rticles...'"#:placeholder="__('Search articles...')"#
			</TextInput>
rticles...'"#:placeholder="__('Search articles...')"#
		</div>
rticles...'"#:placeholder="__('Search articles...')"#
		<div class="flex justify-between items-center text-base text-ink-gray-5 mx-2">
rticles...'"#:placeholder="__('Search articles...')"#
			<div>All articles</div>
rticles...'"#:placeholder="__('Search articles...')"#
			<Button variant="ghost" :aria-label="__('Open docs')" @click="openDocs">
rticles...'"#:placeholder="__('Search articles...')"#
				<LucideArrowUpRight class="size-4 text-ink-gray-5" />
rticles...'"#:placeholder="__('Search articles...')"#
			</Button>
rticles...'"#:placeholder="__('Search articles...')"#
		</div>
rticles...'"#:placeholder="__('Search articles...')"#
		<div class="flex flex-col gap-1.5 overflow-y-auto">
rticles...'"#:placeholder="__('Search articles...')"#
			<div v-for="a in parsedArticles" :key="a.title" class="flex flex-col gap-1.5">
rticles...'"#:placeholder="__('Search articles...')"#
				<div
rticles...'"#:placeholder="__('Search articles...')"#
					class="flex items-center justify-between p-1.5 hover:bg-surface-gray-1 rounded-4 cursor-pointer"
rticles...'"#:placeholder="__('Search articles...')"#
					@click="a.opened = !a.opened"
rticles...'"#:placeholder="__('Search articles...')"#
				>
rticles...'"#:placeholder="__('Search articles...')"#
					<div class="flex items-center gap-2">
rticles...'"#:placeholder="__('Search articles...')"#
						<component
rticles...'"#:placeholder="__('Search articles...')"#
							:is="a.opened ? LucideChevronDown : LucideChevronRight"
rticles...'"#:placeholder="__('Search articles...')"#
							class="size-4 text-ink-gray-5"
rticles...'"#:placeholder="__('Search articles...')"#
						/>
rticles...'"#:placeholder="__('Search articles...')"#
						<div class="text-base text-ink-gray-8">{{ a.title }}</div>
rticles...'"#:placeholder="__('Search articles...')"#
					</div>
rticles...'"#:placeholder="__('Search articles...')"#
				</div>
rticles...'"#:placeholder="__('Search articles...')"#
				<div v-show="a.opened" class="flex flex-col gap-1.5 ml-5">
rticles...'"#:placeholder="__('Search articles...')"#
					<div
rticles...'"#:placeholder="__('Search articles...')"#
						v-for="subArticle in a.subArticles"
rticles...'"#:placeholder="__('Search articles...')"#
						:key="subArticle.name"
rticles...'"#:placeholder="__('Search articles...')"#
						class="group flex items-center justify-between gap-2 p-1.5 hover:bg-surface-gray-1 rounded-4 cursor-pointer"
rticles...'"#:placeholder="__('Search articles...')"#
						@click="() => openDoc(subArticle.name)"
rticles...'"#:placeholder="__('Search articles...')"#
					>
rticles...'"#:placeholder="__('Search articles...')"#
						<div class="flex items-center gap-2">
rticles...'"#:placeholder="__('Search articles...')"#
							<LucideFileText class="size-4 text-ink-gray-5" />
rticles...'"#:placeholder="__('Search articles...')"#
							<div class="text-base text-ink-gray-8">
rticles...'"#:placeholder="__('Search articles...')"#
								{{ subArticle.title }}
rticles...'"#:placeholder="__('Search articles...')"#
							</div>
rticles...'"#:placeholder="__('Search articles...')"#
						</div>
rticles...'"#:placeholder="__('Search articles...')"#
						<LucideArrowUpRight
rticles...'"#:placeholder="__('Search articles...')"#
							class="size-4 hidden group-hover:flex text-ink-gray-5"
rticles...'"#:placeholder="__('Search articles...')"#
						/>
rticles...'"#:placeholder="__('Search articles...')"#
					</div>
rticles...'"#:placeholder="__('Search articles...')"#
				</div>
rticles...'"#:placeholder="__('Search articles...')"#
			</div>
rticles...'"#:placeholder="__('Search articles...')"#
		</div>
rticles...'"#:placeholder="__('Search articles...')"#
	</div>
rticles...'"#:placeholder="__('Search articles...')"#
</template>
rticles...'"#:placeholder="__('Search articles...')"#
<script setup lang="ts">
rticles...'"#:placeholder="__('Search articles...')"#
import { translate as __ } from "../../utils/translate";
rticles...'"#:placeholder="__('Search articles...')"#
import { Button, TextInput } from "frappe-ui";
rticles...'"#:placeholder="__('Search articles...')"#
import LucideArrowUpRight from "~icons/lucide/arrow-up-right";
rticles...'"#:placeholder="__('Search articles...')"#
import LucideChevronDown from "~icons/lucide/chevron-down";
rticles...'"#:placeholder="__('Search articles...')"#
import LucideChevronRight from "~icons/lucide/chevron-right";
rticles...'"#:placeholder="__('Search articles...')"#
import LucideFileText from "~icons/lucide/file-text";
rticles...'"#:placeholder="__('Search articles...')"#
import LucideSearch from "~icons/lucide/search";
rticles...'"#:placeholder="__('Search articles...')"#
import { ref, computed, onMounted } from "vue";
rticles...'"#:placeholder="__('Search articles...')"#
import type { HelpArticle, HelpCenterProps } from "./types";
rticles...'"#:placeholder="__('Search articles...')"#

rticles...'"#:placeholder="__('Search articles...')"#
const props = withDefaults(defineProps<HelpCenterProps>(), {
rticles...'"#:placeholder="__('Search articles...')"#
	docsLink: "https://docs.frappe.io/crm",
rticles...'"#:placeholder="__('Search articles...')"#
});
rticles...'"#:placeholder="__('Search articles...')"#

rticles...'"#:placeholder="__('Search articles...')"#
// `el` is frappe-ui's current TextInput template-ref member. It is being
rticles...'"#:placeholder="__('Search articles...')"#
// renamed to `inputElement` in frappe-ui 1.0.0 (spec/imperative-api.md), so
rticles...'"#:placeholder="__('Search articles...')"#
// this line follows that rename when the peer range moves to 1.0.0.
rticles...'"#:placeholder="__('Search articles...')"#
const searchInput = ref<{ el?: HTMLInputElement } | null>(null);
rticles...'"#:placeholder="__('Search articles...')"#
const search = ref("");
rticles...'"#:placeholder="__('Search articles...')"#
const articles = defineModel<HelpArticle[]>();
rticles...'"#:placeholder="__('Search articles...')"#

rticles...'"#:placeholder="__('Search articles...')"#
const parsedArticles = computed(() => {
rticles...'"#:placeholder="__('Search articles...')"#
	if (!search.value) return articles.value;
rticles...'"#:placeholder="__('Search articles...')"#

rticles...'"#:placeholder="__('Search articles...')"#
	return articles.value?.filter((a) => {
rticles...'"#:placeholder="__('Search articles...')"#
		const filteredSubArticles = a.subArticles.filter((subArticle) => {
rticles...'"#:placeholder="__('Search articles...')"#
			return subArticle.title.toLowerCase().includes(search.value.toLowerCase());
rticles...'"#:placeholder="__('Search articles...')"#
		});
rticles...'"#:placeholder="__('Search articles...')"#

rticles...'"#:placeholder="__('Search articles...')"#
		return (
rticles...'"#:placeholder="__('Search articles...')"#
			a.title.toLowerCase().includes(search.value.toLowerCase()) ||
rticles...'"#:placeholder="__('Search articles...')"#
			filteredSubArticles.length > 0
rticles...'"#:placeholder="__('Search articles...')"#
		);
rticles...'"#:placeholder="__('Search articles...')"#
	});
rticles...'"#:placeholder="__('Search articles...')"#
});
rticles...'"#:placeholder="__('Search articles...')"#

rticles...'"#:placeholder="__('Search articles...')"#
function openDocs() {
rticles...'"#:placeholder="__('Search articles...')"#
	window.open(props.docsLink, "_blank");
rticles...'"#:placeholder="__('Search articles...')"#
}
rticles...'"#:placeholder="__('Search articles...')"#

rticles...'"#:placeholder="__('Search articles...')"#
function openDoc(name: string) {
rticles...'"#:placeholder="__('Search articles...')"#
	window.open(`${props.docsLink}/${name}`, "_blank");
rticles...'"#:placeholder="__('Search articles...')"#
}
rticles...'"#:placeholder="__('Search articles...')"#

rticles...'"#:placeholder="__('Search articles...')"#
onMounted(() => {
rticles...'"#:placeholder="__('Search articles...')"#
	searchInput.value?.el?.focus();
rticles...'"#:placeholder="__('Search articles...')"#
});
rticles...'"#:placeholder="__('Search articles...')"#
</script>
rticles...'"#:placeholder="__('Search articles...')"#
