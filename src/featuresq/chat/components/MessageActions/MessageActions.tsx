type MessageActionsProps = {
  children: React.ReactNode;
};

export default function MessageActions({
  children,
}: MessageActionsProps): React.JSX.Element {
  return <div className="mt-2 flex items-center gap-2">{children}</div>;
}
