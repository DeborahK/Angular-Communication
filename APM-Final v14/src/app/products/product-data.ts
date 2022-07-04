import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IProduct } from './product';

export class ProductData implements InMemoryDbService {

    createDb() {
        const products: IProduct[] = [
            {
                id: 1,
                productName: 'Leaf Rake',
                productCode: 'GDN-0011',
                releaseDate: 'March 19, 2017',
                description: 'Leaf rake with 48-inch wooden handle',
                price: 19.95,
                starRating: 3.2,
                imageUrl: 'assets/images/leaf_rake.png',
                category: 'Garden',
                tags: ['rake', 'leaf', 'yard', 'home']
            },
            {
                id: 2,
                productName: 'Garden Cart',
                productCode: 'GDN-0023',
                releaseDate: 'March 18, 2017',
                description: '15 gallon capacity rolling garden cart',
                price: 32.99,
                starRating: 4.2,
                imageUrl: 'assets/images/garden_cart.png',
                category: 'Garden'
            },
            {
                id: 5,
                productName: 'Hammer',
                productCode: 'TBX-0048',
                releaseDate: 'May 21, 2017',
                description: 'Curved claw steel hammer',
                price: 8.9,
                starRating: 4.8,
                imageUrl: 'assets/images/hammer.png',
                category: 'Toolbox',
                tags: ['tools', 'hammer', 'construction']
            },
            {
                id: 8,
                productName: 'Saw',
                productCode: 'TBX-0022',
                releaseDate: 'May 15, 2017',
                description: '15-inch steel blade hand saw',
                price: 11.55,
                starRating: 3.7,
                imageUrl: 'assets/images/saw.png',
                category: 'Toolbox',
            },
            {
                id: 10,
                productName: 'Video Game Controller',
                productCode: 'GMG-0042',
                releaseDate: 'October 15, 2017',
                description: 'Standard two-button video game controller',
                price: 35.95,
                starRating: 4.6,
                imageUrl: 'assets/images/xbox-controller.png',
                category: 'Gaming',
            }
        ];
        return { products };
    }
}
