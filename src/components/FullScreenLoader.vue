<template>
    <div class="loader-parent">
        <div class="loader"></div>
    </div>
</template>
 
<script>
    export default {
        name: 'FullScreenLoader'
    }
</script>

<style>
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .loader {
        display:flex;
        border: 16px solid #f3f3f3;
        border-top: 16px solid #3498db;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        animation: spin 2s linear infinite;
    }
    .loader-parent {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110vh;
        width: 100vw;
        position: absolute;
        top: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 10;
    }
</style>