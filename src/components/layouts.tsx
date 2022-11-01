import Drawer from "./drawer";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <Drawer>{children}</Drawer>;
}
