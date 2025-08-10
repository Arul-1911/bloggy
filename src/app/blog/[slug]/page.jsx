import dateFormat from "@/utils/dateFormat";
import { Calendar } from "lucide-react";
import Image from "next/image";

export default function SingleBlog() {
  const tags = ["Backend", "Concurrency", "Go"];
  const tempHtml = `
  <p>Demo Html</p>
  <h2>Test H2</h2>
  `;
  return (
    <section>
      <div className="flex flex-col gap-4 items-center justify-center">
        <Image
          src="https://mobisoftinfotech.com/resources/wp-content/uploads/2022/02/og-hire-golang-developers.png"
          height={250}
          width={500}
          alt="Single Image"
          className="rounded border sm:w-[80%] md:w-[700px] "
        />
        <div className="meta-of-a-blog space-y-2">
          <div className="flex gap-2 items-center">
            <Calendar className="text-gray-400 w-4 h-4" />
            <p className="text-gray-400 text-xs">
              Created On: {dateFormat(new Date())}
            </p>
          </div>
          <div className="text-xs flex items-center gap-2">
            <p>Category:</p>
            <p className="badge border border-gray-700 bg-gray-600/30 w-fit px-2 py-1 rounded">
              Golang Exploration
            </p>
          </div>
          <div className="text-xs flex items-center gap-2">
            <p>Tags:</p>
            {tags?.map((tag, index) => (
              <p className="badge border  border-gray-700 bg-gray-600/30 w-fit px-[4px] py-[2px] rounded">
                {tag}
              </p>
            ))}
          </div>
        </div>
        {/* <div
            className="content"
            dangerouslySetInnerHTML={{ __html: tempHtml }}
          ></div> */}
        <p className="text-sm w-[90%] md:w-2/3  text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
          dignissimos culpa fugit adipisci vel maxime, praesentium error beatae
          sit, numquam qui perspiciatis voluptates nemo quam iusto saepe
          maiores, commodi molestias. Voluptatibus aperiam repellat aut? Nihil
          omnis officia dolores, ad dolorem sint! Beatae quos odio omnis quam?
          Suscipit pariatur quo corrupti nemo nihil quod tempora iste quibusdam
          nobis ad repellat eos sit consequuntur minus vel veritatis quaerat
          earum praesentium officiis, totam incidunt odio ex maiores est. Hic,
          officiis nesciunt. Optio pariatur eum voluptatibus nisi! Mollitia
          explicabo quasi dignissimos. Exercitationem dicta amet quidem, a
          laborum similique facere provident iusto omnis ea nesciunt cum quis
          cumque cupiditate neque ut nostrum porro, quod minima accusantium.
          Error deserunt consequatur officia impedit a, temporibus ex nam
          assumenda, aliquam molestias eaque quaerat eius eligendi. Animi, eaque
          illum cumque soluta minus dignissimos odio harum, deleniti quisquam,
          voluptates velit possimus fuga reiciendis impedit iure numquam aperiam
          dolorem voluptas eius. Voluptatem est officia fuga facilis quae,
          officiis sed alias iste at. Velit accusamus explicabo aut amet commodi
          iste eligendi laborum, tempora tenetur, debitis aspernatur
          consequuntur veritatis quidem, suscipit nostrum optio neque deleniti
          recusandae officiis voluptatem ea soluta quo consequatur nihil? Modi
          unde voluptatem quos perspiciatis vitae, tempore error tempora culpa.
        </p>
      </div>
    </section>
  );
}
