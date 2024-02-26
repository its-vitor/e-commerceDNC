class CustomErrors extends Error {
    public statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode;
    }
}

class ProductNameTooBig extends CustomErrors {
    constructor() {
        super("O nome do produto excede o tamanho permitido de setenta caracteres.", 406);
    }
}

class ProductDescriptionTooBig extends CustomErrors {
    constructor() {
        super("A descrição do produto excede o tamanho permitido de três mil caracteres.", 406);
    }
}

class ProductPriceNotAllowed extends CustomErrors {
    constructor() {
        super("O preço do produto não pode ser menor ou igual a zero.", 406);
    }
}

class ActionNotAllowed extends CustomErrors {
    constructor() {
        super("Ação não permitida.", 405);
    }
}

export {
    CustomErrors,
    ProductNameTooBig,
    ProductDescriptionTooBig,
    ProductPriceNotAllowed,
    ActionNotAllowed,
}