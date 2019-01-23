import { Component, ViewChild, OnInit, HostListener, ElementRef } from '@angular/core';

@Component({
    selector: 'app-visualizer',
    templateUrl: './visualizer.component.html',

    styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

    title = 'Visualizer';
    @ViewChild('canvas') canvasRef: ElementRef;
    // ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    public context: CanvasRenderingContext2D;

    w: number = window.innerWidth;
    h: number = window.innerHeight;
    offset: number = 30;
    goalSize: number = 1.2;
    damgerZoneSize: number = 2.4;
    bool = true;
    fieldHeight: number;
    fieldWidth: number;
    lastX = this.w / 2;
    lastY = this.h / 2;
    dragged = true;
    dragStart;
    zoomScale: number = 1;



    ngOnInit() {
        this.context = (<HTMLCanvasElement>this.canvasRef.nativeElement).getContext('2d');
        this.Drawfield(this.context);
        this.DrawBall(this.context, 4.5, 6);
        this.DrawRobot(this.context, 12, "yellow", 0, 2, 2);
        this.DrawRobot(this.context, 4, "yellow", 0, 4, 2);
        this.DrawRobot(this.context, 5, "yellow", 0, 5, 2);
        this.DrawRobot(this.context, 2, "yellow", 0, 7, 2);
        this.DrawRobot(this.context, 8, "yellow", 0, 3.5, 3.5);
        this.DrawRobot(this.context, 10, "yellow", 0, 4.5, 3.5);
        this.DrawRobot(this.context, 22, "yellow", 0, 5.5, 3.5);
        this.DrawRobot(this.context, 7, "yellow", 0, 3.5, 5);
        this.DrawRobot(this.context, 9, "yellow", 180, 4.5, 5);
        this.DrawRobot(this.context, 11, "yellow", 0, 5.5, 5);

        this.DrawRobot(this.context, 12, "blue", 0, 2, 10);
        this.DrawRobot(this.context, 4, "blue", 0, 4, 10);
        this.DrawRobot(this.context, 5, "blue", 0, 5, 10);
        this.DrawRobot(this.context, 2, "blue", 0, 7, 10);
        this.DrawRobot(this.context, 8, "blue", 0, 3.5, 8.5);
        this.DrawRobot(this.context, 10, "blue", 0, 4.5, 8.5);
        this.DrawRobot(this.context, 22, "blue", 0, 5.5, 8.5);
        this.DrawRobot(this.context, 7, "blue", 0, 3.5, 7);
        this.DrawRobot(this.context, 9, "blue", 0, 4.5, 7);
        this.DrawRobot(this.context, 11, "blue", 0, 5.5, 7);
    }
    zoom(event) {

        console.log(this.fieldWidth);
        console.log(event.pageX + "|||" + event.pageY);
        if (event.deltaY < 0) {
            this.zoomScale = this.zoomScale + 0.5;
            this.context.save();
            this.context.clearRect(0, 0, this.w, this.h + this.offset);
            //this.context.translate(event.pageX, event.pageY );

            this.context.scale(this.zoomScale, this.zoomScale);
            this.Drawfield(this.context);
            this.context.restore();
        }
        else if (event.deltaY > 0) {
            this.zoomScale = this.zoomScale - 0.5;
            this.context.save();
            this.context.clearRect(0, 0, this.w, this.h + this.offset);
            // this.context.translate(event.pageX , event.pageY );

            this.context.scale(this.zoomScale, this.zoomScale);
            this.Drawfield(this.context);
            this.context.restore();
        }


    }
    Drawfield(context) {

        this.fieldHeight = this.h - this.offset - 30;
        this.fieldWidth = this.fieldHeight / (12 / 9);

        context.beginPath();
        context.lineWidth = this.Convert(0.01);
        context.fillStyle = "green";
        context.beginPath();
        context.fillRect(0, 0, (this.h - this.offset + 10) / (12 / 9), this.h - this.offset);
        context.stroke();

        context.beginPath();
        context.lineWidth = this.Convert(0.01);
        context.strokeStyle = "white";
        context.rect(15, 15, this.fieldWidth, this.fieldHeight);
        context.stroke();
        //middle line
        context.beginPath();
        context.lineWidth = this.Convert(0.01);
        context.strokeStyle = "white";
        context.moveTo(15, this.fieldHeight / 2 + 15);
        context.lineTo(this.fieldWidth + 15, this.fieldHeight / 2 + 15);
        context.stroke();
        //draw middle circle
        context.beginPath();
        context.lineWidth = this.Convert(0.01);
        context.strokeStyle = "white";
        context.arc(this.fieldWidth / 2 + 15, this.fieldHeight / 2 + 15, this.fieldWidth / 18, 0, 2 * Math.PI);
        context.stroke();

        context.beginPath();
        context.lineWidth = this.Convert(0.01);
        context.strokeStyle = "white";
        context.arc(this.Convert(4.5) + 15, this.Convert(6) + 15, this.Convert(0.025), 0, 2 * Math.PI);
        context.stroke();
        //draw top danger Zone
        var goal = this.fieldHeight / 10;
        var danger = this.fieldHeight / 5;

        context.beginPath();
        context.lineWidth = this.Convert(0.01);
        context.strokeStyle = "white";
        context.rect(this.fieldWidth / 2.72 + 15, 15, danger, goal);
        context.stroke();
        //draw bot danger Zone
        context.beginPath();
        context.lineWidth = this.Convert(0.01);
        context.strokeStyle = "white";
        context.rect(this.fieldWidth / 2.72 + 15, this.fieldHeight - goal + 15, danger, goal);
        context.stroke();
    }
    DrawBall(context, x, y) {
        context.beginPath();
        context.lineWidth = this.Convert(0.01);
        context.strokeStyle = "Orange";
        context.arc(this.Convert(x) + 15, this.Convert(y) + 15, this.Convert(0.025), 0, 2 * Math.PI);
        context.fillStyle = "#ff6600";
        context.fill();
        context.stroke();
    }
    DrawRobot(context, id, color, rotateAngle, x, y) {

        var angle = 41.81 * Math.PI / 180;
        var xx = 0.04974;//center of robot to....
        var yy = 0.075;

        context.beginPath();
        context.lineWidth = this.Convert(0.01);
        if (color == "blue") {
            context.strokeStyle = "darkblue";
            context.fillStyle = "blue";
        }
        else if (color == "yellow") {
            context.strokeStyle = "GoldenRod ";
            context.fillStyle = "yellow";
        }
        context.arc(this.Convert(x) + 15, this.Convert(y) + 15, this.Convert(0.09), Math.PI + angle, 1.5 * Math.PI + (Math.PI / 2 - angle), true);
        context.fill();
        context.stroke();
        context.beginPath();
        context.font = "6px Arial Black";
        context.fillStyle = "black";
        if (id > 9) {
            context.fillText(id, 15 + this.Convert(x) - 4, 15 + this.Convert(y) + 2.5);
        }
        else
            context.fillText(id, 15 + this.Convert(x) - 2, 15 + this.Convert(y) + 2.5);
        context.stroke();

        context.beginPath();
        context.lineCap = "butt";
        context.moveTo(this.Convert(x - yy) + 15.256, this.Convert(y - xx) + 14.47);
        context.lineTo(this.Convert(x + yy) + 14.744, this.Convert(y - xx) + 14.47);
        context.stroke();
    }
    Convert(x) { return x * this.fieldHeight / 12; }

}
