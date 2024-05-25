<template>
    <div class="container">
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
    </div>
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
        min-width: 30%;
        font-size: 1rem;
        z-index: 1;
        padding: 10px;
        border-radius: 10px;
    }
    .container {
        display: flex;
        justify-content: center; 
        align-items: center; 
    }
</style>