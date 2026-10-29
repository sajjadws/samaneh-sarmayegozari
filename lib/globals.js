import * as utils from "./utils";

function getAssets(filePath, src = "public") {
    if (src === "public") {
        return `/${filePath.replace(/^\/+/, "")}`;
    }

    return `/modules/${src}/${filePath.replace(/^\/+/, "")}`;
}

function getRole(role){
    let roleName = null;
    if (typeof role === "string"){
        switch (role) {
            case "admin":
                roleName = "ADMIN"
            break;
            case "user":
                roleName = "USER"
            break;
        }
    }
    else if (typeof role === "number"){
        switch (role) {
            case 0:
                roleName = "ADMIN"
            break;
            case 1:
                roleName = "USER"
            break;
        }
    }
    return roleName;
}

globalThis.getAssets = getAssets;
globalThis.getRole = getRole;
globalThis.utils = utils;