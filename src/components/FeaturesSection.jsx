import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Share Your Ideas",
    description:
      "Write and share your thoughts, ideas, and stories with the world. Papyrus allows you to express yourself through writing.",

    icon: CloudArrowUpIcon,
  },
  {
    name: "Connect with Others",
    description:
      "Connect with like-minded individuals and engage in meaningful discussions. Build a community of readers and writers.",

    icon: UserGroupIcon,
  },
  {
    name: "Discover New Content",
    description:
      "Explore a vast collection of articles, essays, and stories written by talented authors. Find content that interests you.",
    icon: ArrowPathIcon,
  },
];

export default function FeaturesSection() {
  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-papyrus">
              Empowering Writers and Readers
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Discover the Features of Papyrus
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Papyrus is more than just a writing platform. It's a community
              where writers and readers come together to share, connect, and
              discover. Explore the key features that make Papyrus unique.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon
                      className="h-5 w-5 flex-none text-papyrus"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6"></p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
