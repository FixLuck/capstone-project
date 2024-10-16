import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";

  function MemberChange(){
    return(
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-1/2 border border-gray-400 rounded-lg p-4">
          <CardHeader>
            <CardTitle>Quản lí member</CardTitle>
            <CardDescription>Chỉnh sửa và thêm thành viên</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-4">
              <div className="grid gap-2 items-start space-y-2">
                <Label>Member ID</Label>
                <Input id="member_id" type="text" className="bg-gray-300" disabled />
              </div>
              <div className="grid gap-2 items-start space-y-2">
                <Label>Username</Label>
                <Input id="username" type="text" />
              </div>
              <div className="flex flex-col items-start space-y-2">
                <Label>Password</Label>
                <Input id="password" type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="mr-4" variant="secondary">Back</Button>
            <Button className="mr-4" variant="secondary">Add</Button>
            <Button className="mr-4" variant="secondary">Save</Button>     
          </CardFooter>
        </Card>
      </div>
    );
  }

  export default MemberChange;
