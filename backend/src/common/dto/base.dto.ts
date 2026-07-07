import { z, type ZodType } from "zod";

export default class BaseDto {
  static schema: ZodType = z.object({});

  static validate<T>(this: { schema: ZodType<T> }, data: unknown) {
    const result = this.schema.safeParse(data);

    if (!result.success) {
      return {
        error: result.error.issues.map((issue) => issue.message),
        value: null,
      };
    }

    return {
      error: null,
      value: result.data,
    };
  }
}
