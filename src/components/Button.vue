<template>
    <cdx-button
        :disabled="isDisabled"
        @click="onClick"
        :action="action"
        :weight="weight"
    >
        <span v-if="iconLink">
            <cdx-icon :class="iconClass" :icon="iconLink"></cdx-icon>
        </span>
        <span class="button-text">{{ buttonText }}</span>
    </cdx-button>
</template>
  
<script>
    import { CdxButton, CdxIcon } from "@wikimedia/codex";
    import "@wikimedia/codex";

    export default {
        name: 'Button',
        components: {
            CdxButton,
            CdxIcon
        },
        props: {
            isDisabled: Boolean,
            onClick: Function,
            iconLink: String,
            buttonText: String,
            action: {
                type: String,
                default: 'progressive'
            },
            weight: {
                type: String,
                default: 'primary'
            }
        }
    }
</script>  

<style>
    .cdx-button {
        position: fixed;
        bottom: 0;
        font-size: 1rem;
        z-index: 1;
    }
</style>