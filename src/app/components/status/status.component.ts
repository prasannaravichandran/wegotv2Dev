import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
    isLoggedIn: boolean = false;

    constructor(private auth: AuthService) {
    }

    ngOnInit(): void {
        const token = sessionStorage.getItem('token');
        if (token) {
            //console.log(token)
            this.auth.ensureAuthenticated(token)
                .then((user) => {
                    //console.log(user.json());
                    if (user.json().status === 'success') {
                        this.isLoggedIn = true;
                    }
                })
                .catch((err) => {
                    //console.log(err);
                });
        }
    }
}
