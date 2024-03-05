import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const imageUrls = [
  'https://i.cbc.ca/1.6521806.1657900155!/fileImage/httpImage/winston-hacking.jpg',
  'https://i.redd.it/everyones-been-making-cool-ai-generated-dragonball-art-with-v0-x4sgjz1mzxg91.png?width=1024&format=png&auto=webp&s=2ad4efb4d8c8ca9241428960913dae43c5562e96',
  'https://static01.nyt.com/images/2018/03/09/opinion/08li/merlin_135158616_3f53a96c-4523-4885-9673-59fa39ca3f9b-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
  'https://akm-img-a-in.tosshub.com/sites/visualstory/stories/2023_03/story_26490/assets/21.jpeg?time=1678932529',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-k9kw2TPRVZT4NjqqhjBDjNt3HUyaPEo3hg&usqp=CAU'  // ... more image URLs
];

export function CarouselDemo() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[900px]"
    >
      <CarouselContent>
      {imageUrls.map((url, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img src={url} alt={`Carousel item ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-xl" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
