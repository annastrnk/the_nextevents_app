import MainHeader from "./main-header";

export default function (props) {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
}
