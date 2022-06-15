import Button from "react-bootstrap/Button";

export const DButton = (action: () => any, text: string) => {
  return (
    <Button
      variant="primary"
      type="button"
      onMouseUp={() => {
        action();
      }}
    >
      {text}
    </Button>
  );
};
