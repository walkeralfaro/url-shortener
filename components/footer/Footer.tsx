import Link from "next/link";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  menuItems = [
    {
      title: "Features",
      links: [
        { text: "Link Shortening", url: "#" },
        { text: "Branded Links", url: "#" },
        { text: "Analytics", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Blog", url: "#" },
        { text: "Developers", url: "#" },
        { text: "Support", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "#" },
        { text: "Our Team", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Contact", url: "#" },
      ],
    },
  ],
}: FooterProps) => {
  return (
    <section className="bg-gray-900 text-white py-32">
      <div className="container mx-auto max-w-6xl p-4">
        <footer className="text-center">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">

            <div className="text-white text-3xl font-black mb-8 lg:mb-0">
              Shortly
            </div>

            {menuItems.map((section, index) => (
              <div key={index}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-gray-400 space-y-3 lg:space-y-4">
                  {section.links.map((link, index) => (
                    <li
                      key={index}
                      className="hover:text-blue-400 font-medium"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex justify-center">


              <ul className="flex gap-4 ">
                <li>
                  <Link href='#facebook'>
                    <img src="/icon-facebook.svg" />
                  </Link>
                </li>
                <li>
                  <Link href='#twitter'>
                    <img src="/icon-twitter.svg" />
                  </Link>
                </li>
                <li>
                  <Link href='#pinterest'>
                    <img src="/icon-pinterest.svg" />
                  </Link>
                </li>
                <li>
                  <Link href='#instagram'>
                    <img src="/icon-instagram.svg" />
                  </Link>
                </li>
              </ul>

            </div>

          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
