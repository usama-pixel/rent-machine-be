import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class MessagesInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // console.log(context.getClass().name);
        return next.handle().pipe(
            map((data) => {
                // data = data?.map(d => {content: d})
                const revised_data = data.map(d => ({content: {...d}}))
                // console.log({revised_data})
                // data.map(d => console.log({d: d.to.id}))
                // console.log({data})
                return revised_data
            })
        );
    }
}