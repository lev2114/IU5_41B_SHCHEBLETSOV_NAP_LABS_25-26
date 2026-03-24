import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import { amarnaCollection } from "../../data/amarna.js"
import { HeaderComponent } from "../../components/header/index.js"

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

    getHTML() {
        return (
            `
                <div id="product-page"></div>
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
    }
}
