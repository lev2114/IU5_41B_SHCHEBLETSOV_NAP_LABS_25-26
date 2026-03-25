import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import { HeaderComponent } from "../../components/header/index.js"

import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export class ProductPage {
    constructor(parent, id, data) {
        this.parent = parent
        this.id = id
        this.data = data
    }

    getData() {
        return this.data.find(item => item.id == this.id)
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    init3DModel() {

        const container = document.getElementById("model-container")

        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            75,
            1,
            0.1,
            1000
        )

        const renderer = new THREE.WebGLRenderer({ antialias: true })

        renderer.setSize(400, 400)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05

        controls.enableZoom = true
        controls.enablePan = false

        container.appendChild(renderer.domElement)

        const light = new THREE.AmbientLight(0xffffff, 1)
        scene.add(light)

        const loader = new GLTFLoader()

        loader.load(

            "./models/amarna_model.glb",

            function (gltf) {

                const model = gltf.scene

                scene.add(model)

                model.rotation.y = Math.PI

            },

            undefined,

            function (error) {
                console.error("Ошибка загрузки модели:", error)
            }

        )

        camera.position.z = 3

        function animate() {

            requestAnimationFrame(animate)

            controls.update()

            renderer.render(scene, camera)

        }

        animate()

    }

    getHTML() {
        return (
            `
                <div class="container mt-4">

                    <div id="product-page"></div>

                    <div id="model-container"
                         style="width:400px;height:400px;margin-top:20px;">
                    </div>

                </div>
            `
        )
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const header = new HeaderComponent(this.parent)
        header.render()

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        const data = this.getData()
        const product = new ProductComponent(this.pageRoot)
        product.render(data)

        this.init3DModel()
    }
}
