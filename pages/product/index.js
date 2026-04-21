import { ProductComponent } from "../../components/service/index.js"
import { BackButtonComponent } from "../../components/back-button/index.js"
import { MainPage } from "../main/index.js"
import { HeaderComponent } from "../../components/header/index.js"

import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

import { artworkUrls } from "../../modules/artworkUrls.js"
import { ajax } from "../../modules/ajax.js"

export class ProductPage {

    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getData() {
        ajax.get(
            artworkUrls.getArtworkById(this.id),
            (data) => {
                const product = new ProductComponent(this.pageRoot)
                product.render(data)
            }
        )
    }

    clickBack() {
        new MainPage(this.parent).render()
    }

    init3DModel() {
        const container = document.getElementById("model-container")

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ antialias: true })

        renderer.setSize(400, 400)
        container.appendChild(renderer.domElement)

        const controls = new OrbitControls(camera, renderer.domElement)

        const light = new THREE.AmbientLight(0xffffff, 1)
        scene.add(light)

        const loader = new GLTFLoader()

        loader.load("./models/amarna_model.glb", (gltf) => {
            scene.add(gltf.scene)
        })

        camera.position.z = 3

        function animate() {
            requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
        }

        animate()
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div id="product-page"></div>
                <div id="model-container" style="width:400px;height:400px;"></div>
            </div>
        `
    }

    render() {
        this.parent.innerHTML = ""

        const header = new HeaderComponent(this.parent)
        header.render()

        this.parent.insertAdjacentHTML("beforeend", this.getHTML())

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        this.getData()
        this.init3DModel()
    }
}
