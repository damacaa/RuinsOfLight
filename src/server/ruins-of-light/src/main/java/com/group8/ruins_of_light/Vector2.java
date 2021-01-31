package com.group8.ruins_of_light;

public class Vector2 {
	
    public float x;
    public float y;
       
    public Vector2() {
        this.x = 0.0f;
        this.y = 0.0f;
    }
       
    public Vector2(float x, float y) {
        this.x = x;
        this.y = y;
    }
       
    public boolean equals(Vector2 v) {
        return (this.x == v.x && this.y == v.y);
    }
    
    public float distance(Vector2 v) {
    	float a = this.x - v.x;
		float b = this.y - v.y;
		float c = (float) Math.sqrt( a*a + b*b );
        return c;
    }
    
    public float distance(float x, float y) {
    	float a = this.x - x;
		float b = this.y - y;
		float c = (float) Math.sqrt( a*a + b*b );
        return c;
    }
}
