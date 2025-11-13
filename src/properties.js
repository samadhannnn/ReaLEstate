// properties.js
const properties = [
    {
      id: 1,
      name: "Luxury Villa",
      description: "Beautiful luxury villa with ocean view. This stunning property features an infinity pool, private beach access, and a state-of-the-art smart home system. The villa has been recently renovated with high-end finishes and fixtures throughout.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      additionalImages: [
        "https://plus.unsplash.com/premium_photo-1677474827617-6a7269f97574?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1682889762731-375a6b22d794?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      address: "123 Ocean Drive, Miami FL",
      attributes: [
        { trait_type: "Property Type", value: "Villa" },
        { trait_type: "Year Built", value: "2020" },
        { trait_type: "Bedrooms", value: "4" },
        { trait_type: "Bathrooms", value: "3" },
        { trait_type: "Square Feet", value: "3200" },
        { trait_type: "Garage", value: "2 Cars" }
      ],
      price: "20" // Price in ETH
    },
    {
      id: 2,
      name: "Modern Apartment",
      description: "Contemporary apartment in downtown area with stunning city views. Features include floor-to-ceiling windows, open concept layout, and a private balcony. Building amenities include a rooftop pool, fitness center, and 24-hour concierge.",
      image: "https://imgs.search.brave.com/RuEZ8wA9jyw4IhvIBMq_8Nv4DyGkIcQSSZMUfb_VR2k/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI4/MTE4MDk0Ni9waG90/by9iZWF1dGlmdWwt/bHV4dXJ5LWhvbWUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXE3VXFGVlBiNzJK/R0lKNkE3OUg5QkR0/WEZDS0dGWUtwbVc2/NGh4dzZ2Ulk9",
      additionalImages: [
        "https://www.bhg.com/thmb/LCpz94HRf9w4DLdPN68tcU0_a8Y=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/renovated-neutral-colored-living-room-2f194807-ffec1b4c8bca4fecac43ddcce2eed86d.jpg",
        "https://img.jamesedition.com/listing_images/2024/10/24/11/25/08/de9da1bf-fa26-43fc-8d17-13eaaceb0532/je/1112x684xcxm.jpg",
        "https://img.jamesedition.com/listing_images/2024/10/24/11/25/08/aeacd74c-3a19-4745-878e-edb3b8043d45/je/1112x684xcxm.jpg"
      ],
      address: "456 Main Street, Seattle WA",
      attributes: [
        { trait_type: "Property Type", value: "Apartment" },
        { trait_type: "Year Built", value: "2018" },
        { trait_type: "Bedrooms", value: "2" },
        { trait_type: "Bathrooms", value: "2" },
        { trait_type: "Square Feet", value: "1500" },
        { trait_type: "Garage", value: "1 Car" }
      ],
      price: "15" // Price in ETH
    },
    {
      id: 3,
      name: "Suburban Home",
      description: "Family-friendly home in a quiet neighborhood with excellent schools. This charming property features a spacious backyard, recently updated kitchen, and hardwood floors throughout. Close to parks, shopping, and major commuting routes.",
      image: "https://img.jamesedition.com/listing_images/2025/01/29/12/22/00/353cedec-9420-4b25-8400-90ff8edeb8f9/je/1112x684xcxm.jpg",
      additionalImages: [
        "https://img.jamesedition.com/listing_images/2024/11/15/15/53/32/bef7fef5-3022-47f6-b9ed-c0f83f3c5981/je/1112x684xcxm.jpg",
        "https://img.jamesedition.com/listing_images/2024/12/12/13/38/44/bfd2f837-3865-4c21-bc3b-86758cfca16b/je/1112x684xcxm.jpg",
        "https://img.jamesedition.com/listing_images/2024/12/12/13/38/44/43b591d6-e71b-42e8-a4c2-bf590ceac7c4/je/1112x684xcxm.jpg"
      ],
      address: "789 Maple Avenue, Austin TX",
      attributes: [
        { trait_type: "Property Type", value: "Single Family" },
        { trait_type: "Year Built", value: "2015" },
        { trait_type: "Bedrooms", value: "3" },
        { trait_type: "Bathrooms", value: "2.5" },
        { trait_type: "Square Feet", value: "2400" },
        { trait_type: "Garage", value: "2 Cars" }
      ],
      price: "10" // Price in ETH
    },
    {
      id: 4,
      name: "Beachfront Condo",
      description: "Luxurious beachfront condo with panoramic ocean views. This unit features premium finishes, a gourmet kitchen, and a spacious primary suite. Resort-style amenities include a private beach, multiple pools, and a fitness center.",
      image: "https://img.jamesedition.com/listing_images/2024/10/22/13/13/08/5a4c9a99-54d6-43f4-b085-a7b1d29d678c/je/1112x684xcxm.jpg",
      additionalImages: [
        "https://img.jamesedition.com/listing_images/2024/07/18/10/20/22/a81fde5b-cb9f-4e41-84e8-787025400efd/je/1112x684xcxm.jpg",
        "https://img.jamesedition.com/listing_images/2024/07/18/10/20/22/21cbf246-b90f-4f18-87a5-7a9f833e1642/je/1112x684xcxm.jpg",
        "https://img.jamesedition.com/listing_images/2024/07/18/10/20/22/1132e7af-7332-4a55-9ca4-87eb4a4f0218/je/1112x684xcxm.jpg"
      ],
      address: "567 Shoreline Dr, Malibu CA",
      attributes: [
        { trait_type: "Property Type", value: "Condo" },
        { trait_type: "Year Built", value: "2019" },
        { trait_type: "Bedrooms", value: "3" },
        { trait_type: "Bathrooms", value: "3" },
        { trait_type: "Square Feet", value: "2100" },
        { trait_type: "Garage", value: "2 Cars" }
      ],
      price: "5.8" // Price in ETH
    },
    {
      id: 5,
      name: "Mountain Retreat",
      description: "Stunning mountain lodge offering privacy and breathtaking views. Features include a stone fireplace, vaulted ceilings, and expansive outdoor living spaces. Perfect as a vacation home or year-round residence in a tranquil setting.",
      image: "https://media.istockphoto.com/id/1854475510/photo/exterior-view-of-modern-house.jpg?s=1024x1024&w=is&k=20&c=Ls891zL016O_E2D_gZZvWJqNQP4TlHVXNj0eirVlNHo=",
      additionalImages: [
        "",
        "",
        ""
      ],
      address: "245 Pine Ridge Road, Aspen CO",
      attributes: [
        { trait_type: "Property Type", value: "Lodge" },
        { trait_type: "Year Built", value: "2012" },
        { trait_type: "Bedrooms", value: "4" },
        { trait_type: "Bathrooms", value: "3.5" },
        { trait_type: "Square Feet", value: "3800" },
        { trait_type: "Garage", value: "2 Cars" }
      ],
      price: "25" // Price in ETH
    },
    {
      id: 6,
      name: "Historic Brownstone",
      description: "Meticulously restored historic brownstone in the heart of the city. This property blends original architectural details with modern updates. Features include high ceilings, original woodwork, and a private garden oasis.",
      image: "https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=2928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      additionalImages: [
        "",
        "",
        ""
      ],
      address: "421 Beacon Street, Boston MA",
      attributes: [
        { trait_type: "Property Type", value: "Brownstone" },
        { trait_type: "Year Built", value: "1890" },
        { trait_type: "Year Renovated", value: "2017" },
        { trait_type: "Bedrooms", value: "3" },
        { trait_type: "Bathrooms", value: "2.5" },
        { trait_type: "Square Feet", value: "2700" },
        { trait_type: "Parking", value: "Street" }
      ],
      price: "7" // Price in ETH
    },
    {
      id: 7,
      name: "Urban Loft",
      description: "Spacious industrial loft in a converted warehouse. Features include exposed brick walls, concrete floors, and floor-to-ceiling windows. Located in a vibrant neighborhood with easy access to restaurants, galleries, and public transit.",
      image: "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=3067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      additionalImages: [
        "",
        "",
        ""
      ],
      address: "78 Warehouse District, Portland OR",
      attributes: [
        { trait_type: "Property Type", value: "Loft" },
        { trait_type: "Year Built", value: "1920" },
        { trait_type: "Year Converted", value: "2010" },
        { trait_type: "Bedrooms", value: "1" },
        { trait_type: "Bathrooms", value: "2" },
        { trait_type: "Square Feet", value: "1800" },
        { trait_type: "Parking", value: "1 Space" }
      ],
      price: "8" // Price in ETH
    },
    {
      id: 8,
      name: "Lakefront Estate",
      description: "Spectacular estate with private lake frontage and dock. The home features panoramic water views, a gourmet kitchen, and a luxurious primary suite. Outdoor amenities include a pool, expansive patio, and meticulously landscaped grounds.",
      image: "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      additionalImages: [
        "",
        "",
        ""
      ],
      address: "1240 Lakeshore Drive, Lake Tahoe NV",
      attributes: [
        { trait_type: "Property Type", value: "Estate" },
        { trait_type: "Year Built", value: "2014" },
        { trait_type: "Bedrooms", value: "5" },
        { trait_type: "Bathrooms", value: "5.5" },
        { trait_type: "Square Feet", value: "6200" },
        { trait_type: "Garage", value: "3 Cars" },
        { trait_type: "Waterfront", value: "200 ft" }
      ],
      price: "8.5" // Price in ETH
    }
  ];
  
  export default properties;