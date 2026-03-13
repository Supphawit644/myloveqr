type Props = {
    url: string;
  };
  
  export function ShareLine({ url }: Props) {
  
    const shareUrl =
      "https://social-plugins.line.me/lineit/share?url=" +
      encodeURIComponent(url);
  
    return (
      <a
        href={shareUrl}
        target="_blank"
        className="rounded-lg bg-green-500 px-4 py-2 text-white"
      >
        Share to LINE
      </a>
    );
  }