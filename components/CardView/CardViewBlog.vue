<template>
    <v-card
        class="mx-auto card-hover"
        height="100%"
        rounded="lg"
        outlined
        :to="getBlogRoute(resource.id)"
    >
        <v-img
            class="white--text align-end"
            :aspect-ratio="16 / 9"
            :src="resource.thumbnail"
            gradient="to top right, rgba(100,115,201,.4), rgba(25,32,72,.7)"
        >
            <v-card-title>
                <p class="text-break line-clamp-3">{{ resource.name }}</p>
            </v-card-title>
        </v-img>
        <v-card-subtitle class="pb-0" v-if="resource.published_date">
            {{ $moment(resource.published_date).format("MMMM DD, YYYY") }}
        </v-card-subtitle>
        <v-card-text class="text--primary" style="min-height:5rem; max-height:9rem;">
            <div class="line-clamp-3">{{ resource.description }}</div>
        </v-card-text>
        <!-- <v-spacer></v-spacer> -->
        <v-card-actions class="pa-0 card-resource-file__footer">
            <v-spacer></v-spacer>
            <v-btn
                @click.prevent.stop="saveToList"
                :loading="isSaving"
                elevation="0"
                color="primary"
                large
                icon
                tile
            >
                <v-icon small>
                    {{ isSaved ? "mdi-bookmark" : "mdi-bookmark-outline" }}
                </v-icon>
            </v-btn>
            <v-menu left top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        v-on:click.prevent
                        elevation="0"
                        color="primary"
                        large
                        icon
                        tile
                    >
                        <v-icon small>mdi-share-variant</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="(item, index) in shareOptions"
                        :key="index"
                        @click.prevent="shareTo(resource, item.type)"
                    >
                        <v-list-item-icon class="mr-2">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: "CardViewBlog",
    props: {
        resource: Object,
        isSaved: Boolean,
        isSaving: Boolean,
    },
    data() {
        return {};
    },
    methods: {
        shareTo(resource, type) {
            if (type == "copy") {
                this.copyLink();
                return;
            }

            let url = this.fileURL;
            let text = resource.name;
            const shareURL = {
                linkedin: `https://www.linkedin.com/shareArticle?mini=true&title=${text}&url=${url}`,
                facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
                twitter: `https://twitter.com/share?url=${url}&text=${text}`,
                telegram: `https://t.me/share/url?url=${url}&text=${text}`,
            };

            if (!!shareURL[type]) window.open(shareURL[type]);
        },
        saveToList() {
            this.$emit("toggle-save");
        },
        copyLink() {
            const DOMAIN2SHARE =
                this.$config.SHARE_URL || window?.location?.origin;
            const url =
                DOMAIN2SHARE +
                "/resource/category/blog/" +
                (this.resource.id || "");
            if (!process.browser) return;
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(url);
                this.$toast.show(this.$t("message.copied"));
                return;
            }

            const input = document.createElement("input");
            input.value = url;
            input.style.position = "fixed";
            input.style.left = "-999999px";
            input.style.top = "-999999px";
            document.body.appendChild(input);
            input.focus();
            input.select();
            document.execCommand("copy");
            input.remove();
            this.$toast.show(this.$t("message.copied"));
        },
        getBlogRoute(id) {
            // 
            return `${this.currentRoute}/${id}`;
        },
    },
    computed: {
        shareOptions() {
            return [
                {
                    text: this.$t("menu.share_to.linkedin"),
                    icon: "mdi-linkedin",
                    type: "linkedin",
                },
                {
                    text: this.$t("menu.share_to.facebook"),
                    icon: "mdi-facebook",
                    type: "facebook",
                },
                {
                    text: this.$t("menu.share_to.twitter"),
                    icon: "mdi-twitter",
                    type: "twitter",
                },
                {
                    text: this.$t("menu.share_to.telegram"),
                    icon: "mdi-send-circle",
                    type: "telegram",
                },
                {
                    text: this.$t("menu.share_to.clipboard"),
                    key: "menu.share_to.copy",
                    icon: "mdi-content-copy",
                    type: "copy",
                },
            ];
        },
        linkTo() {
            const { resourceId, $route } = this;
            return { query: { ...$route.query, id: resourceId } };
        },
        currentRoute() {
            const { path } = this.$route;
            return path;
        },
    },
};
</script>
