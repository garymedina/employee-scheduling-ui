/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import './add/add';
import './edit/edit';
import template from './locations.html!text';
import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.locations', {
    url: '/locations',
    template: template,
    resolve: {
        locations: ['LocationResource', LocationResource => LocationResource.getList()]
    }
})
@Inject('locations', 'LocationService', 'FormService')
//end-non-standard
class SettingLocations {
    constructor(locations, LocationService, FormService) {
        LocationService.setLocations(locations);
        this.locations = LocationService.getLocations();
        this.FormService = FormService;
    }

    deleteLocation(location) {
        if(location.default) {
            this.hasError = true;
            this.errorMessage = `The default location can't be deleted.`;
        } else {
            location.remove().then(() => {
                this.locations.splice(this.locations.indexOf(location), 1);
                this.FormService.success(this);
            }, (response) => {
                this.FormService.failure(this, response);
            });
        }
    }
}
