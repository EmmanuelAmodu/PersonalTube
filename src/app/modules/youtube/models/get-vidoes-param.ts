interface IGetVidoesParam {
    videosPerPage: number;
    saveToken: boolean;
    token: string;
    country: string;
    catg: string;
}

export class GetVidoesParam implements IGetVidoesParam {
    videosPerPage: number = 50;
    saveToken: boolean = false;
    token: string = "";
    country: string = "";
    catg: string = "";
}

