<template>
    <v-card
        @click="viewFile"
        class="mx-auto custom-shadow overflow-hidden card-hover"
        height="100%"
        rounded="lg"
        outlined
    >
        <v-layout class="fill-height" column>
            <v-card-text class="py-6 card-resource-file__thumbnail-wrapper">
                <v-img
                    :src="resource.thumbnail"
                    class="card-resource-file__thumbnail"
                    min-height="250"
                    max-height="250"
                    alt=""
                    contain
                ></v-img>
            </v-card-text>

            <v-card-title>
                <v-layout>
                    <p class="text-break line-clamp-3 mb-0">
                        {{ resource.name }}
                    </p>
                </v-layout>
            </v-card-title>

            <v-card-text class="flex-fill">
                {{ resource.description }}
            </v-card-text>
            <v-card-actions class="pa-0 card-resource-file__footer">
                <v-btn
                    v-if="resource.file"
                    @click.stop="downloadFile(resource.file.url)"
                    class="elevation-0 pa-4"
                    height="auto"
                    tile
                    text
                >
                    <v-icon small>mdi-download</v-icon> {{ $t("download") }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    @click.stop="saveToList"
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
                            class="elevation-0 py-4"
                            height="auto"
                            color="dark"
                            tile
                            text
                        >
                            <v-icon small>mdi-share-variant</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in shareOptions"
                            :key="index"
                            @click.stop="shareTo(resource, item.type)"
                        >
                            <v-list-item-icon class="mr-2">
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item>
<!--                        <v-list-item @click.stop="copyLink">-->
<!--                            <v-list-item-icon class="mr-2">-->
<!--                                <v-icon>mdi-content-copy</v-icon>-->
<!--                            </v-list-item-icon>-->
<!--                            <v-list-item-title>-->
<!--                                {{ $t("menu.share_to.clipboard") }}-->
<!--                            </v-list-item-title>-->
<!--                        </v-list-item>-->
                    </v-list>
                </v-menu>
            </v-card-actions>
        </v-layout>

        <v-snackbar v-model="snackbar" :timeout="2000" light>
            {{ $t("message.copied") }}
        </v-snackbar>
    </v-card>
</template>
<script>
export default {
    name: "CardViewResourceFile",
    props: {
        resource: Object,
        isSaved: Boolean,
        isSaving: Boolean,
    },
    data() {
        return {
            snackbar: false,
        };
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
        localeURL() {
            return "/resource/file/" + this.resource.id;
        },
        fileURL() {
            const DOMAIN2SHARE =
                this.$config.SHARE_URL || window?.location?.origin;
            return DOMAIN2SHARE + "/resource/file/" + this.resource.id;
        },
    },
    methods: {
        saveToList() {
            this.$emit("toggle-save");
        },
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
        downloadFile(url) {
            window.open(url, "_blank");
        },
        viewFile() {
            this.$router.push(this.localeURL);
        },
    },
};
</script>
<style>
.card-resource-file__thumbnail-wrapper {
    padding: 2rem;
    background-color: #f2f2f2;
}
.card-resource-file__footer {
    background-color: #fefaf7;
    bottom: 0;
}
.card-resource-file__footer .v-btn {
    color: #f79b36;
    transition: 500ms;
}
.card-resource-file__download:hover {
    background-color: #f79b36;
    color: #fefaf7;
    transition: 500ms;
}
.card-resource-file__thumbnail {
    filter: drop-shadow(0px 5px 10px rgba(17, 11, 11, 0.25));
}
</style>
