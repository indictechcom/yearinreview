<template>

    <label> {{label}} </label>
    <cdx-text-input
        required
        :pattern="pattern"
        @keyup.enter="start"
        type="text"
        v-model="project"
    ></cdx-text-input>

</template>
  
<script>
    import { CdxTextInput } from "@wikimedia/codex";
    import "@wikimedia/codex";

    export default {
        name: 'InputWithLabel',
        components: {
            CdxTextInput
        },
        props: {
            label: String,
            pattern: String,
            value: String,
            start: Function
        }
    }
</script>  