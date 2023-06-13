import {Get, Route} from "tsoa";

interface HolaMundoResponse {
    message: string;
}

@Route("hola-mundo")
export default class SampleController {
    @Get("/")
    public async holaMundo(): Promise<HolaMundoResponse> {
        return {
            message: "Hola mundo!",
        };
    }
}