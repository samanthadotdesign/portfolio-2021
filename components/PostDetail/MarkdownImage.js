import Image from "next/image";

export default function MarkdownImage(props) {
  return (
    <div className="rounded-edges">
      <Image {...props} layout="responsive" loading="lazy" />
    </div>
  );
}
