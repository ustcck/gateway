import { element, by } from 'protractor';

export class BlogComponentsPage {
    createButton = element(by.css('#jh-create-entity'));
    title = element.all(by.css('jhi-blog div h2#page-heading span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BlogUpdatePage {
    PageTitle = element(by.css('h2#jhi-blog-heading'));
    saveButton = element(by.css('#save-entity'));
    cancelButton = element(by.css('#cancel-save'));
    nameInput = element(by.css('input#field_name'));
    handleInput = element(by.css('input#field_handle'));

    getPageTitle() {
        return this.PageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setHandleInput(handle) {
        this.handleInput.sendKeys(handle);
    }

    getHandleInput() {
        return this.handleInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    cancel() {
        this.cancelButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
