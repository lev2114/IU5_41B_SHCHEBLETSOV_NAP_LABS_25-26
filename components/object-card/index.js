export class ProductCardComponent {

    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (`
            <div class="card" style="width:300px">

                <img src="${data.src}" class="card-img-top">

                <div class="card-body">

                    <h5>${data.title}</h5>

                    <p>${data.text}</p>

                    <button
                        class="btn btn-outline-britannica"
                        id="open-${data.id}"
                        data-id="${data.id}">
                        Подробнее
                    </button>

                    <button
                        id="edit-${data.id}"
                        class="btn btn-outline-britannica mt-2"
                        data-id="${data.id}">
                        Редактировать
                    </button>

                    <button
                        class="btn btn-danger mt-2"
                        id="delete-${data.id}">
                        Удалить
                    </button>

                </div>

            </div>
        `)
    }

    addListeners(data, openListener, deleteListener, editListener) {

        document
            .getElementById(`delete-${data.id}`)
            .addEventListener("click", () => deleteListener(data.id))

        document
            .getElementById(`open-${data.id}`)
            .addEventListener("click", openListener)

        document
            .getElementById(`edit-${data.id}`)
            .addEventListener("click", editListener)
    }

    render(data, openListener, deleteListener, editListener) {

        const html = this.getHTML(data)

        this.parent.insertAdjacentHTML("beforeend", html)

        this.addListeners(
            data,
            openListener,
            deleteListener,
            editListener
        )
    }
}