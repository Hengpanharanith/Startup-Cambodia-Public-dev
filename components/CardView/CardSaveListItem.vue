<template>
    <v-card :to="to" class="mb-4" rounded="lg" outlined>
        <v-card-text class="pa-0">
            <v-layout class="flex-nowrap flex-column flex-sm-row">
                <v-col class="flex-grow-1 text-center text-sm-left">
                    <v-layout
                        class="gap my-auto flex-row-reverse flex-sm-column justify-center"
                        fill-height
                    >
                        <p class="ma-0 text--primary blog-one__title">
                            {{ title }}
                        </p>
                        <div v-html="description"></div>
                    </v-layout>
                </v-col>
            </v-layout>
        </v-card-text>
        <v-card-actions class="pa-0 card-resource-file__footer">
            <v-chip small color="primary" class="mx-3 text-uppercase">{{itemType}}</v-chip>
            <v-spacer></v-spacer>
            <v-btn
                @click.prevent.stop="saveToList"
                :loading="isSaving"
                class="elevation-0 py-4"
                height="auto"
                color="primary"
                width="56"
                icon
                tile
            >
                <v-icon>mdi-bookmark</v-icon>
            </v-btn>
            <v-menu left top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        v-on:click.prevent
                        class="elevation-0 py-4"
                        height="auto"
                        width="56"
                        color="primary"
                        icon
                        tile
                    >
                        <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="(item, index) in shareOptions"
                        :key="index"
                        @click.stop="shareTo(item, item.type)"
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
    name: "CardSaveListItem",
    props: {
        title: String,
        description: String,
        thumbnail: String,
        to: String,
        isSaving: Boolean,
        itemType:{type:String,  default: () => "" },
    },
    methods: {
        copyLink() {
            const url = this.fileURL;
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
            this.snackbar = true;
        },
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
        fileURL() {
            const DOMAIN2SHARE =
                this.$config.SHARE_URL || window?.location?.origin;
        
        
            return DOMAIN2SHARE  + this.to;
        },
    },
};
</script>

<style lang="sass">
.search-item .v-list-item__subtitle p
  margin: 0
</style>
