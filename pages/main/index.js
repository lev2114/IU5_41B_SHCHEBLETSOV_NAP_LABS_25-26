import { amarnaCollection } from "../../data/amarna.js"
import { ProductCardComponent } from "../../components/product-card/index.js"
import { HeaderComponent } from "../../components/header/index.js"
import { ProductPage } from "../product/index.js"

export class MainPage {

    constructor(parent) {
        this.parent = parent
        this.data = [...amarnaCollection]
    }

    get pageRoot() {
        return document.getElementById("main-page")
    }

    getHTML() {
        return `
            <div class="container mt-4">

                <div class="mb-3">

                    <input
                        id="search"
                        class="form-control"
                        placeholder="Поиск по амарнскому искусству"
                    >

                    <button
                        id="add-card"
                        class="btn btn-primary mt-2"
                    >
                        Добавить карточку
                    </button>

                </div>

                <div
                    id="main-page"
                    class="d-flex flex-wrap gap-3"
                ></div>

            </div>
        `
    }

    addCard() {

        const first = this.data[0]

        const copy = {
            ...first,
            id: Date.now()
        }

        this.data.push(copy)

        this.renderCards()
    }

    openCard(e) {

        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId, this.data)

        productPage.render()

    }

    deleteCard(id) {

        this.data = this.data.filter(item => item.id != id)

        this.renderCards()
    }

    filterCards() {

        const value = document
            .getElementById("search")
            .value
            .toLowerCase()

        const filtered = this.data.filter(item =>
            item.title.toLowerCase().includes(value)
        )

        this.renderCards(filtered)
    }

    renderCards(list = this.data) {

        this.pageRoot.innerHTML = ""

        list.forEach(item => {

            const card = new ProductCardComponent(this.pageRoot)

            card.render(
                item,
                this.openCard.bind(this),
                this.deleteCard.bind(this)
            )

        })
    }

    render() {

        this.parent.innerHTML = ""

        const header = new HeaderComponent(this.parent)
        header.render()

        const html = this.getHTML()

        this.parent.insertAdjacentHTML("beforeend", html)

        this.renderCards()

        document
            .getElementById("add-card")
            .addEventListener(
                "click",
                this.addCard.bind(this)
            )

        document
            .getElementById("search")
            .addEventListener(
                "input",
                this.filterCards.bind(this)
            )
    }

}
