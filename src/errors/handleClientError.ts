import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  let errors: IGenericErrorMessage[] = [];
  let message = '';
  const statusCode = 400;
  if (error.code === 'P2025') {
    message =
      (error.meta?.cause as string) ||
      'One or more records that were required but not found.';
    errors = [
      {
        path: '',
        message,
      },
    ];
  } else if (error.message.includes('delete()` invocation:')) {
    message = (error.meta?.cause as string) || "Couldn't delete";
    errors = [
      {
        path: '',
        message,
      },
    ];
  }
  return {
    statusCode,
    message: '',
    errorMessages: errors,
  };
};

export default handleClientError;
