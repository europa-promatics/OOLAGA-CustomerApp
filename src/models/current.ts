export class Current {
    card:any;
    pics:any;
    month:any;
    year:any;
    cvc:any;
    oolaga_created:boolean=false;
    oolaga_id:any;
    service_id:any;
    service_name:any;
    service_description:any;
    service_image:any;
    helper_no:any
    helper_number:any;
    date:any;
    time:any;
    first_time:any;
    last_time:any;
    fullDate:any;
    firstAvailableTime:any;
    lastAvailableTime:any;
    edit_location_data:boolean=false;
    edit_item_data:boolean=false;
    enable_draft:boolean=false;
    summary_edit_service:boolean=false;
    summary_edit_item:boolean=false;
    summary_edit_location:boolean=false;
    summary_edit_dateTime:boolean=false; 
    summary_edit_oolagaType:boolean=false;
    summary_edit_helper:boolean=false;
    semmery_edit_service:boolean=false;
    summary_edit_price:boolean=false;
    draft_edit_price:boolean=false;
    draft_edit_labor_location:boolean=false;
    Draft_edit_dateTime:boolean=false;
    draft_edit_item:boolean=false;
    min_price;
    max_price;
    price:any;
    oolagaType:any;
    oolagaTypeDiscription:any;
    locations:Array<{
        curbside:any,
        inhome:any,
        latitude:any,
        loc_no:any,
        oolaga_id:any,
        longitude:any,
        location_name:any,
        unit_nu?:any,
        elevator?:any,
        stairs?:any,
        ride?:any,
		iwillbehelping?:any,
        parking_info?:any,
        store_name?:any,
        purchaser?:any,
        order_number?:any,
        phone?:any,
        additional_contact?:any
    }>;
    items:Array<{
        item_name:any,
        quantity:any,
        oolaga_id:any,
        item_id:any,
        src_item_loc:any,
        dst_item_loc:any,
        information?:any,
        pics?:any
    }>;
    src_location;
    dst_location;
    way_point1;
    way_point2;
    laborLocationName?:any;
    laborLocationLat?:any;
    laborLocationLng?:any;
    laborHours?:any;
    laborUnit_no?:any;
    laborInfo?:any;
    constructor() {
    }
}
