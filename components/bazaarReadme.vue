<template>
    <div id="configBazaarReadme" class="config-bazaar__readme config-bazaar__readme--show">
        <div class="item__side">
            <div class="fn__flex">
                <div @click='返回' class="block__icon block__icon--show b3-tooltips b3-tooltips__e" data-type="goBack"
                    aria-label="返回上一层">
                    <svg>
                        <use xlink:href="#iconLeft"></use>
                    </svg>
                    <span class="fn__space"></span>
                    服务
                </div>
            </div>
            <div class="fn__flex-1"></div>
            <img class="item__img" :src="bazaarPackage.icon" >
            <a href="https://github.com/leolee9086/browserTab" target="_blank" class="item__title"
                title="GitHub Repo">{{ bazaarPackage.name }}</a>
            <br>
            <a href="https://github.com/leolee9086/browserTab" target="_blank" class="ft__on-surface ft__smaller"
                title="GitHub Repo">{{ bazaarPackage.name }}</a>
            <div class="block__icons">
                <span class="fn__flex-1"></span>
                <a target="_blank" href="https://afdian.net/a/leolee9086" data-type="a"
                    class="block__icon block__icon--show" aria-label="给开发者捐赠 https://afdian.net/a/leolee9086"><svg
                        class="ft__pink">
                        <use xlink:href="#iconHeart"></use>
                    </svg></a>
                <span class="fn__space"></span>
                <a href="https://github.com/leolee9086" target="_blank" title="Creator">{{ bazaarPackage.author }}</a>
                <span class="fn__flex-1"></span>
            </div>
            <div class="fn__hr--b"></div>
            <div class="fn__hr--b"></div>
            <div class="ft__on-surface ft__smaller" style="line-height: 20px;">当前版本<br>v{{ bazaarPackage.version }}</div>
            <div class="fn__hr"></div>
            <div class="ft__on-surface ft__smaller" style="line-height: 20px;">安装日期<br>2023-05-25</div>
            <div class="fn__hr"></div>
            <div class="ft__on-surface ft__smaller" style="line-height: 20px;">安装大小<br>1.8 MB</div>
            <div class="fn__hr--b fn__none"></div>
            <div class="fn__hr--b fn__none"></div>
            <div class="fn__none">
                <button class="b3-button" style="width: 168px" data-type="install">下载</button>
            </div>
            <div class="fn__none">
                <button class="b3-button" style="width: 168px" data-type="install-t">更新</button>
            </div>
            <div class="fn__hr--b fn__none"></div>
            <div class="fn__hr--b fn__none"></div>
            <div class="fn__flex fn__none" style="justify-content: center;">
                <svg class="svg ft__on-surface fn__flex-center">
                    <use xlink:href="#iconGithub"></use>
                </svg>
                <span class="fn__space"></span>
                <a :href="bazaarPackage.url" target="_blank" title="GitHub Repo">Repo</a>
                <span class="fn__space"></span>
                <span class="fn__space"></span>
                <svg class="svg ft__on-surface fn__flex-center">
                    <use xlink:href="#iconStar"></use>
                </svg>
                <span class="fn__space"></span>
                <a href="https://github.com/leolee9086/browserTab/stargazers" target="_blank" title="Starts">0</a>
                <span class="fn__space"></span>
                <span class="fn__space"></span>
                <svg class="svg ft__on-surface fn__flex-center">
                    <use xlink:href="#iconGitHubI"></use>
                </svg>
                <span class="fn__space"></span>
                <a href="https://github.com/leolee9086/browserTab/issues" target="_blank" title="Open issues">0</a>
                <span class="fn__space"></span>
                <span class="fn__space"></span>
                <svg class="svg ft__on-surface fn__flex-center">
                    <use xlink:href="#iconDownload"></use>
                </svg>
                <span class="fn__space"></span>
                0
            </div>
            <div class="fn__hr--b"></div>
            <div class="fn__hr--b"></div>
            <div class="fn__flex-1"></div>
        </div>
        <div class="item__main" >
            <div class="item__preview" style="background-image: url(bazaarPackage.preview)"></div>
            <div class="b3-typography" v-html="Md2HTML(bazaarPackage.readme)">

            </div>
        </div>
    </div>
</template>
<script setup>
import { defineEmits, ref, onMounted } from 'vue'
const { bazaarPackage } = defineProps(['bazaarPackage'])
const emits = defineEmits('return')
const lute = Lute.New()

function Md2HTML(md) {
    return lute.Md2HTML(md)
}

function 返回() {
    emits('return')
}
</script>