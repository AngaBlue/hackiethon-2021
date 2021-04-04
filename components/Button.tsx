type ButtonType = "default" | "warning" | "danger" | "primary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ButtonType;
}

const colour: { [key in ButtonType]: string } = {
    default: "bg-blue-100",
    primary: "bg-blue-600",
    danger: "bg-red-600",
    warning: "bg-yellow-600"
};

export default function Button({ variant, ...props }: ButtonProps): JSX.Element {
    return (
        <button
            {...props}
            className={`py-2 px-8 rounded border-b-4 text-white w-max ${colour[variant]} ${props.className || ""}`}
            style={Object.assign({ borderColor: "rgba(0,0,0,0.3)" }, props.style || {})}
        />
    );
}
