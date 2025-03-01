import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: unknown) {
    const { error } = this.schema.validate(value);

    if (error) {
      const errorMessages = error.details.map((d) => d.message).join();
      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }

    return value;
  }
}
