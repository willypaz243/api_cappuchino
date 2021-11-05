import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import {
	clientError,
	resourceNotFound,
	successfulRequest,
} from "../../utils/handlerHttpRequest";
import { Icontroller, Iservice } from "./interfaces";

class Controller implements Icontroller {
	private service: Iservice;

	constructor(service: Iservice) {
		this.service = service;
	}

	async getAllProfessors(req: Request, res: Response): Promise<Response> {
		const department: string = req.params.department;

		try {
			const model = await this.service.getAllProfessors(department);
			if (!model) return resourceNotFound(res);

			return successfulRequest(res, model);
		} catch (error) {
			return clientError(res, "");
		}
	}

	async getProfessorSubjects(req: Request, res: Response): Promise<Response> {
		const department: string = req.params.department;
		const professor: string = req.params.professor;

		try {
			const model = await this.service.getProfessorSubjects(department, professor);
			if (!model) return resourceNotFound(res);

			return successfulRequest(res, model);
		} catch (error) {
			return clientError(res, "");
		}
	}
}

export default Controller;
