type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p className="text-center text-red-500">{message}</p>
);

export default ErrorMessage;
