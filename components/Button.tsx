type ButtonType = "default" | "warning" | "danger" | "primary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ButtonType;
}

const colour: { [key in ButtonType]: string } = {
    default: "bg-gray-600",
    primary: "bg-blue-600",
    danger: "bg-red-600",
    warning: "bg-orange-600"
};

export default function Button({ variant, ...props }: ButtonProps): JSX.Element {
    return (
        <button
            {...props}
            className={`py-2 px-4 rounded border-b-4 text-white ${colour[variant]}`}
            style={{ borderColor: "rgba(0,0,0,0.3)" }}
        />
    );
}
