export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.src}" class="img-fluid" alt="картинка">
                        </div>

                        <div class="col-md-8">
                            <div class="card-body">

                                <label for="service-title" class="form-label">
                                    Название услуги
                                </label>

                                <input
                                    id="service-title"
                                    class="form-control mb-3"
                                    type="text"
                                    value="${data.title}"
                                >

                                <label for="service-text" class="form-label">
                                    Описание услуги
                                </label>

                                <textarea
                                    id="service-text"
                                    class="form-control"
                                    rows="5"
                                >${data.text}</textarea>

                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}