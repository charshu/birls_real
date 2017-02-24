import {
    Pipe,
    PipeTransform,
    Injectable
} from "@angular/core";

@Pipe({
    name: 'myfilter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], args: any): any {
        if (!items) return [];
        return items.filter(it => {
            console.log(args)
            let season = it.getLink('collection.season');
            let seasonName = season.getText('season.name');
            let brand = it.getLink('collection.brand');
            let brandName = brand.getText('brand.name');
            if (args.brand === 'all' && args.season === 'all') {
                return true;
            } else if (args.brand === 'all') {
                if (season.id === args.season)
                    return true;
                else
                    return false;
            } else if (args.season === 'all') {
                if (brand.id === args.brand)
                    return true;
                else
                    return false;
            } else {
                if (brand.id === args.brand && season.id === args.season)
                    return true;
                else
                    return false;
            }



        });
    }
}