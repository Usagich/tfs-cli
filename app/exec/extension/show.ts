import { TfCommand } from "../../lib/tfcommand";
import args = require("../../lib/arguments");
import extBase = require("./default");
import extInfo = require("./_lib/extensioninfo");
import galleryContracts = require("vso-node-api/interfaces/GalleryInterfaces");
import publishUtils = require("./_lib/publish");
import trace = require("../../lib/trace");

export function getCommand(args: string[]): extBase.ExtensionBase<galleryContracts.PublishedExtension> {
    return new ExtensionShow(args);
}

export class ExtensionShow extends extBase.ExtensionBase<galleryContracts.PublishedExtension> {
    protected description = "Show info about a published Visual Studio Services Extension.";
    protected serverCommand = true;

    protected getHelpArgs(): string[] {
        return ["publisher", "extensionId", "vsix"];
    }

    public exec(): Promise<galleryContracts.PublishedExtension> {
        let galleryApi = this.webApi.getGalleryApi(this.webApi.serverUrl);

        return this.identifyExtension().then(extInfo => {
            let sharingMgr = new publishUtils.SharingManager({}, galleryApi, extInfo);
            return sharingMgr.getExtensionInfo();
        });
    }
}
