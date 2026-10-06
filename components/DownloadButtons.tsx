/** The two store buttons, shared by the page-5 intro and the closing
 *  Download page so they always carry the same labels and links. */
export default function DownloadButtons({
  className = "mt-8",
}: {
  className?: string;
}) {
  return (
    <div className={`${className} flex items-center justify-center gap-4`}>
      <a className="btn font-semibold" href="#">
        Get iOS app
      </a>
      <a
        className="btn font-semibold"
        href="https://tally.so/r/A7Vjke"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join the waitlist
      </a>
    </div>
  );
}
