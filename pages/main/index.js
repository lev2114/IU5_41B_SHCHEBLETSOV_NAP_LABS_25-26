import { ProductCardComponent } from "../../components/service-card/index.js"
import { HeaderComponent } from "../../components/header/index.js"
import { ProductPage } from "../product/index.js"

import { sumOfSquares, isEqualObj, removeValues, merge } from "../../utils/amarnaMath.js"

import { artworkUrls } from "../../modules/artworkUrls.js"
import { ajax } from "../../modules/ajax.js"

export class MainPage {

    constructor(parent) {
        this.parent = parent
        this.data = []
    }

    get pageRoot() {
        return document.getElementById("main-page")
    }

    getHTML() {
        return `
            <div class="container mt-4">

                <div class="mb-3">
                    <div class="analysis-block mt-3">
                        <h5>Анализ амарнских услуг</h5>

                        <button id="calc-sum" class="btn btn-outline-britannica">
                            Сумма квадратов ID
                        </button>

                        <button id="compare-artifacts" class="btn btn-outline-britannica">
                            Сравнить первые две услуги
                        </button>

                        <button id="remove-test" class="btn btn-outline-britannica">
                            Удалить ID 1 и 2
                        </button>

                        <button id="merge-test" class="btn btn-outline-britannica">
                            Merge услуг
                        </button>

                        <div id="analysis-result" class="mt-2"></div>
                    </div>

                    <input id="search" class="form-control" placeholder="Поиск">

                    <button id="add-card" class="btn btn-primary mt-2">
                        Добавить карточку
                    </button>
                </div>

                <div id="main-page" class="d-flex flex-wrap gap-3"></div>

            </div>
        `
    }

    addCard() {
        const newItem = {
            title: "Новая услуга",
            text: "Добавлено через XHR",
            src: "https://via.placeholder.com/150"
        }

        ajax.post(
            artworkUrls.createArtwork(),
            newItem,
            () => {
                this.getData()
            }
        )
    }

    deleteCard(id) {
        ajax.delete(
            artworkUrls.removeArtworkById(id),
            () => {
                this.getData()
            }
        )
    }

    filterCards() {
        const value = document.getElementById("search").value

        ajax.get(
            artworkUrls.getArtworksByTitle(value),
            (data) => {
                this.renderData(data)
            }
        )
    }

    getData() {
        ajax.get(
            artworkUrls.getArtworks(),
            (data) => {
                this.data = data
                this.renderData(data)
            }
        )
    }

    openCard(e) {
        const id = e.target.dataset.id
        const productPage = new ProductPage(this.parent, id)
        productPage.render()
    }

    renderData(items) {
        this.pageRoot.innerHTML = ""

        items.forEach(item => {
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

        this.parent.insertAdjacentHTML("beforeend", this.getHTML())

        this.getData()

        document.getElementById("add-card")
            .addEventListener("click", this.addCard.bind(this))

        document.getElementById("search")
            .addEventListener("input", this.filterCards.bind(this))

        document.getElementById("calc-sum")
            .addEventListener("click", () => {
                const ids = this.data.map(a => a.id)
                document.getElementById("analysis-result").innerText =
                    sumOfSquares(ids)
            })

        document.getElementById("compare-artifacts")
            .addEventListener("click", () => {
                if (this.data.length < 2) return
                document.getElementById("analysis-result").innerText =
                    isEqualObj(this.data[0], this.data[1])
            })

        document.getElementById("remove-test")
            .addEventListener("click", () => {
                const ids = this.data.map(a => a.id)
                document.getElementById("analysis-result").innerText =
                    removeValues(ids, 1, 2).join(", ")
            })

        document.getElementById("merge-test")
            .addEventListener("click", () => {
                const merged = merge(this.data[0], { period: "Amarna" })
                document.getElementById("analysis-result").innerText =
                    JSON.stringify(merged)
            })
    }
}
